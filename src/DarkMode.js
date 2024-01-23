class DarkMode {
    constructor({ $target }) {
        const $darkMode = document.createElement('label');
        this.$darkMode = $darkMode;
        this.$darkMode.id = "dark-mode";
        this.$darkMode.type = 'checkbox';
        this.$darkMode.innerHTML = '<span>다크모드</span><input type="checkbox" name="dark-mode" checked />';
        $target.appendChild($darkMode);

        if(window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.body.classList.add('dark');
            document.getElementsByName('dark-mode')[0].checked = true;
        } else {
            document.body.classList.add('light');
            document.getElementsByName('dark-mode')[0].checked = false;
        }

        $darkMode.addEventListener("change", e => {
            if (e.target.checked) {
                document.body.classList.add('dark');
                document.body.classList.remove('light');
            } else {
                document.body.classList.remove('dark');
                document.body.classList.add('light');
            }
        })
    }
}