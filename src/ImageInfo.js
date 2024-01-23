class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      const closeButton = this.$imageInfo.querySelector('.close');

      closeButton.addEventListener('click', (e) => {
        this.$imageInfo.style.display = 'none';
      });

      this.$imageInfo.addEventListener('click', (e) => {
        const modal = this.$imageInfo.querySelector('.content-wrapper');

        if (!modal.contains(e.target)) {
          this.$imageInfo.style.display = 'none';
        };
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.$imageInfo.style.display = 'none';
        }
      });
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
