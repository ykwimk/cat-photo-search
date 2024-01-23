console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.loading = new Loading({ $target });

    this.darkMode = new DarkMode({ $target });

    this.useEffect();

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        this.loading.onShowLoading();

        this.onFetchCats(keyword)
          .then(response => this.setState(response.data))
          .catch(e => console.log(e))
          .finally(() => this.loading.onHideLoading());
      },
      onRandomSearch: () => {
        this.loading.onShowLoading();

        this.onFetchRandom()
          .then(response => this.setState(response.data))
          .catch(e => console.log(e))
          .finally(() => this.loading.onHideLoading());
      }
    });

    this.randomSection = new RandomSection({
      $target,
      onInit: () => {
        this.onFetchRandom()
          .then(response => this.setState(response.data))
          .catch(e => console.log(e));
      }
    })

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        this.loading.onShowLoading();

        this.onFetchCatInfo(image.id)
          .then(response => {
            this.imageInfo.setState({
              visible: true,
              image: { ...response.data },
            });
          })
          .catch(e => console.log(e))
          .finally(() => this.loading.onHideLoading());
      }
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null
      }
    });
  }

  useEffect() {
    const urlSearchParams = new URLSearchParams(window.location.search);

    if (urlSearchParams.has('q')) {
      const keyword = urlSearchParams.get('q');

      this.loading.onShowLoading();

      this.onFetchCats(keyword)
          .then(response => this.setState(response.data))
          .catch(e => console.log(e))
          .finally(() => this.loading.onHideLoading());
    }
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }

  async onFetchCats(keyword) {
    return await api.fetchCats(keyword);
  }

  async onFetchCatInfo(id) {
    return await api.fetchCatInfo(id);
  }

  async onFetchRandom() {
    return await api.fetchRandom();
  }
}
