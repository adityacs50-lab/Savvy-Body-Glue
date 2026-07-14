/* A high-end Three.js 3D product renderer for Body Glue */
(() => {
  const canvas = document.querySelector('#webglCanvas');
  if (!canvas) return;

  // 1. Setup Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 100);
  camera.position.set(0, 0, 5.5);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  renderer.shadowMap.enabled = true;

  // Create main product group
  const productGroup = new THREE.Group();
  scene.add(productGroup);

  // 2. Dynamic Textures via Canvas
  function createTubeLabelTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');

    // Background
    ctx.fillStyle = '#1c181a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Gold Gradient
    const gold = ctx.createLinearGradient(0, 0, canvas.width, 0);
    gold.addColorStop(0, '#d1a153');
    gold.addColorStop(0.5, '#f3d393');
    gold.addColorStop(1, '#c59342');

    // Title: BODY
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 88px "DM Sans", Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.letterSpacing = '2px';
    ctx.fillText('BODY', canvas.width / 2, 280);

    // Title: GLUE
    ctx.fillStyle = gold;
    ctx.font = 'bold 112px "DM Sans", Arial, sans-serif';
    ctx.fillText('GLUE', canvas.width / 2, 380);

    // Skin Adhesive Pill Background
    ctx.fillStyle = gold;
    ctx.fillRect(80, 420, canvas.width - 160, 55);

    // Skin Adhesive Pill Text
    ctx.fillStyle = '#1c181a';
    ctx.font = 'bold 30px "DM Mono", monospace';
    ctx.fillText('SKIN ADHESIVE', canvas.width / 2, 458);

    // Features Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '22px "DM Mono", monospace';
    ctx.textAlign = 'left';
    
    const features = [
      '✦ SWEAT & WATER RESISTANT',
      '✦ ALL DAY STRONG HOLD',
      '✦ GENTLE ON SKIN',
      '✦ PERFECT FOR CLOTHING'
    ];
    features.forEach((feat, idx) => {
      ctx.fillText(feat, 90, 550 + idx * 55);
    });

    // Subtext
    ctx.fillStyle = gold;
    ctx.font = '20px "DM Mono", monospace';
    ctx.textAlign = 'center';
    ctx.fillText('MADE FOR EVERY BODY', canvas.width / 2, 800);

    ctx.fillStyle = '#ffffff';
    ctx.font = '22px "DM Mono", monospace';
    ctx.fillText('NET WT. 1.7 FL OZ (50ml) e', canvas.width / 2, 850);

    return new THREE.CanvasTexture(canvas);
  }

  // 3. Create Squeeze Tube Geometry
  function createTubeGeometry() {
    const geom = new THREE.CylinderGeometry(0.7, 0.7, 2.2, 32, 20);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      let y = pos.getY(i); // range from -1.1 to 1.1
      let t = (y + 1.1) / 2.2; // 0 at bottom (cap end), 1 at top (crimp end)

      // Squish the top (crimp end), widen the X dimension slightly
      let zScale = 1 - t * 0.94;
      let xScale = 1 + t * 0.45;

      pos.setX(i, pos.getX(i) * xScale);
      pos.setZ(i, pos.getZ(i) * zScale);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Tube material and mesh
  const labelTex = createTubeLabelTexture();
  const tubeMat = new THREE.MeshStandardMaterial({
    color: 0x1c181a,
    map: labelTex,
    roughness: 0.25,
    metalness: 0.1
  });

  const tubeGeom = createTubeGeometry();
  const tubeMesh = new THREE.Mesh(tubeGeom, tubeMat);
  tubeMesh.position.y = 0.3;
  tubeMesh.rotation.y = Math.PI; // Show label
  productGroup.add(tubeMesh);

  // Cap Geometry & Mesh
  const capGeom = new THREE.CylinderGeometry(0.55, 0.55, 0.45, 32);
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    roughness: 0.4,
    metalness: 0.1
  });
  const capMesh = new THREE.Mesh(capGeom, capMat);
  capMesh.position.y = -1.0;
  productGroup.add(capMesh);

  // Gold Ring Detail between Cap and Tube
  const ringGeom = new THREE.CylinderGeometry(0.56, 0.56, 0.05, 32);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd1a153,
    roughness: 0.3,
    metalness: 0.8
  });
  const ringMesh = new THREE.Mesh(ringGeom, ringMat);
  ringMesh.position.y = -0.78;
  productGroup.add(ringMesh);

  // 4. Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);

  const dirLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
  dirLight1.position.set(5, 5, 4);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
  dirLight2.position.set(-5, 2, -2);
  scene.add(dirLight2);

  const pointLight = new THREE.PointLight(0xffe5b4, 0.6, 10);
  pointLight.position.set(0, 1, 3);
  scene.add(pointLight);

  // 5. Interactions & Animation Loop
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let scrollY = 0;

  // Pointer drag interaction
  let pointerDown = false;
  let prevPointerX = 0;
  let prevPointerY = 0;

  canvas.addEventListener('pointerdown', (e) => {
    pointerDown = true;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
  });

  window.addEventListener('pointermove', (e) => {
    if (!pointerDown) return;
    const deltaX = e.clientX - prevPointerX;
    const deltaY = e.clientY - prevPointerY;
    targetRotationY += deltaX * 0.007;
    targetRotationX += deltaY * 0.007;
    prevPointerX = e.clientX;
    prevPointerY = e.clientY;
  });

  window.addEventListener('pointerup', () => pointerDown = false);
  window.addEventListener('pointercancel', () => pointerDown = false);

  // Scroll link
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  });

  // Color Swatch Event Listener
  document.addEventListener('bodyglue:shade', (e) => {
    const colorHex = e.detail;
    ringMat.color.set(colorHex);
  });

  // Resize Handler
  function resize() {
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (canvas.width !== width || canvas.height !== height) {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    }
  }

  // Animation Frame
  function animate() {
    requestAnimationFrame(animate);
    resize();

    // Smooth rotation dampening
    currentRotationX += (targetRotationX - currentRotationX) * 0.1;
    currentRotationY += (targetRotationY - currentRotationY) * 0.1;

    // Apply rotations
    productGroup.rotation.x = currentRotationX + scrollY * 1.5;
    productGroup.rotation.y = currentRotationY + scrollY * Math.PI * 2;

    // Idle floating animation
    const time = performance.now() * 0.001;
    if (!pointerDown) {
      productGroup.position.y = Math.sin(time * 1.5) * 0.1;
      targetRotationY += 0.003; // Slow self-rotation
    }

    renderer.render(scene, camera);
  }

  // Ready signal
  document.documentElement.classList.add('webgl-ready');
  animate();
})();
