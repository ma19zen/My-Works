(() => {
    const gallery = document.getElementById('imageGallery');
    const uploadForm = document.getElementById('uploadForm');
    const resizeForm = document.getElementById('resizeForm');
    const resizeBtn = document.getElementById('resizeBtn');
    const resultImage = document.getElementById('resultImage');
    const statusMessage = document.getElementById('statusMessage');

    let selectedFilename = null;

    // Fetch and display images from the uploads folder
    async function loadGallery() {
      statusMessage.textContent = 'Loading image gallery...';
      statusMessage.className = '';

      try {
        const res = await fetch('/api/images/list');
        if (!res.ok) throw new Error('Failed to load images list');
        const images = await res.json();

        gallery.innerHTML = '';
        if (images.length === 0) {
          gallery.textContent = 'No images available. Upload some!';
          return;
        }

        images.forEach(filename => {
          const img = document.createElement('img');
          img.src = `/uploads/${filename}`;
          img.alt = filename;
          img.title = filename;
          img.tabIndex = 0;
          img.addEventListener('click', () => selectImage(filename, img));
          img.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              selectImage(filename, img);
            }
          });
          gallery.appendChild(img);
        });
        statusMessage.textContent = '';
      } catch (err) {
        statusMessage.textContent = 'Error loading gallery: ' + err.message;
        statusMessage.className = 'error';
        gallery.innerHTML = '';
      }
    }

    // Highlight selected image and store filename
    function selectImage(filename, imgElement) {
      selectedFilename = filename;
      document.querySelectorAll('.gallery img.selected').forEach(el => {
        el.classList.remove('selected');
      });
      imgElement.classList.add('selected');
      resizeBtn.disabled = false;
    }

    // Handle image upload
    uploadForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearStatus();
      const fileInput = document.getElementById('imageFile');
      if (!fileInput.files.length) {
        setStatus('Please select an image to upload.', true);
        return;
      }
      const file = fileInput.files[0];
      if (file.type !== 'image/jpeg' && file.type !== 'image/jpg') {
        setStatus('Only JPG files are allowed.', true);
        return;
      }

      const formData = new FormData();
      formData.append('image', file);

      try {
        const res = await fetch('/api/images/upload', {
          method: 'POST',
          body: formData,
        });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json.error || 'Upload failed');
        }
        setStatus('Upload successful: ' + json.filename, false);
        fileInput.value = '';
        await loadGallery();
      } catch (err) {
        setStatus(err.message, true);
      }
    });

    // Handle image resize
    resizeForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      clearStatus();

      if (!selectedFilename) {
        setStatus('Please select an image from the gallery first.', true);
        return;
      }

      const width = resizeForm.width.value;
      const height = resizeForm.height.value;

      if (!width || !height || width <= 0 || height <= 0) {
        setStatus('Please enter valid width and height values.', true);
        return;
      }

      //   I used the same URL as in the backend code to fetch the resized image
      // to be also able to resize the image from the url 
      const url = `/api/images/resize?filename=${encodeURIComponent(selectedFilename)}&width=${width}&height=${height}`;

      try {
        const res = await fetch(url);
        if (!res.ok) {
          const json = await res.json();
          throw new Error(json.error || 'Resize failed');
        }
        // Show resized image
        resultImage.src = url;
        resultImage.style.display = 'block';
        setStatus('Image resized successfully!', false);
      } catch (err) {
        setStatus(err.message, true);
        resultImage.style.display = 'none';
      }
    });

    function setStatus(message, isError = false) {
      statusMessage.textContent = message;
      statusMessage.className = isError ? 'error' : 'success';
    }

    function clearStatus() {
      statusMessage.textContent = '';
      statusMessage.className = '';
    }

    // Initial load
    loadGallery();
  })();