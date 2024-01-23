const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandomSearch }) {
    const $searchInputWrapper = document.createElement('div');
    this.$searchInputWrapper = $searchInputWrapper;
    this.$searchInputWrapper.className = 'search-input-wrapper';

    $target.appendChild($searchInputWrapper);

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";

    const $searchButton = document.createElement('button');
    this.$searchButton = $searchButton;
    this.$searchButton.type = 'button';
    this.$searchButton.className = 'random-button';
    this.$searchButton.innerHTML = '랜덤버튼';

    this.$searchInputWrapper.appendChild(this.$searchInput);
    this.$searchInputWrapper.appendChild(this.$searchButton);

    $searchInput.focus();

    const $keywordsList = document.createElement('ul');
    $keywordsList.className = 'keywords-list';

    this.$keywordsList = $keywordsList;
    this.$keywords = JSON.parse(localStorage.getItem('cat-search-keywords'));

    $target.appendChild($keywordsList);

    this.onSearch = onSearch;
    this.onRandomSearch = onRandomSearch;

    console.log("SearchInput created.", this);

    this.handleKeyUpInput();
    this.handleClickInput();
    this.handleClickRandomButton();

    this.render();
  }

  handleKeyUpInput() {
    this.$searchInput.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        const getItem = localStorage.getItem('cat-search-keywords');
        const parseGetItem = JSON.parse(getItem) || [];

        window.history.replaceState(null, '', `?q=${e.target.value}`);

        if (parseGetItem.length >= 5) {
          parseGetItem.shift();
        }

        parseGetItem.push(e.target.value);

        localStorage.setItem('cat-search-keywords', JSON.stringify(parseGetItem));

        this.$keywords = parseGetItem;

        this.onSearch(e.target.value);

        this.render();
      }
    });
  }

  handleClickInput() {
    this.$searchInput.addEventListener("click", (e) => {
      e.target.value = '';
    })
  }

  handleClickRandomButton() {
    this.$searchButton.addEventListener("click", (e) => {
      window.history.replaceState({}, null, window.location.pathname);
      this.onRandomSearch();
    })
  }

  render() {
    if (this.$keywords && !!this.$keywords.length)  {
      this.$keywordsList.innerHTML = this.$keywords.map(keyword => {
        return `<li class="keyword">${keyword}</li>`;
      }).join('');

    }
  }
}
