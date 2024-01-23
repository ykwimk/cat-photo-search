class Loading {
    constructor({ $target }) {
        const $loading = document.createElement('div');

        this.$loading = $loading;
        this.$loading.id = 'loading'
        this.$loading.innerHTML = '<div class="loading-content">로딩중......</div>';
        this.$loading.style.display = 'none';

        $target.appendChild($loading);
        
    }

    onShowLoading() {
        this.$loading.style.display = 'block';
    }

    onHideLoading() {
        this.$loading.style.display = 'none';
    }
}