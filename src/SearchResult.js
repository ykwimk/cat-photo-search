class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("ul");
    this.$searchResult.className = "SearchResult";

    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  lazyLoading() {
    const imgs = document.querySelectorAll('img.lazy');

    const callback = (entries, observer) => {
      entries.forEach(({ isIntersecting, intersectionRatio, target }) => {
        if (isIntersecting && intersectionRatio > 0) {
          target.src = target.dataset.src;
          target.classList.remove("lazy");
          observer.unobserve(target);
        }
      });
    };

    const io = new IntersectionObserver(callback);
    imgs.forEach((img) => io.observe(img));
  }

  render() {
    this.$searchResult.innerHTML = this.data && !!this.data.length
      ? this.data
        .map(
          cat => `
            <li class="item">
              <img class="lazy" data-src=${cat.url} alt=${cat.name} />
            </li>
          `
        )
        .join("")
      : `<div>데이터가 없습니다.</div>`;

    this.$searchResult.querySelectorAll(".item").forEach(($item, index) => {
      $item.addEventListener("click", (e) => {
        e.stopPropagation();
        this.onClick(this.data[index]);
      });
    });

    this.lazyLoading();
  }
}
