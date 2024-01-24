class RandomSection {
  constructor({ $target, randomData, onInit }) {
    this.$randomSection = document.createElement('div');
    this.$randomSection.className = 'random-section';

    $target.appendChild(this.$randomSection);

    this.onInit = onInit;
    this.data = randomData;

    this.render();
  }

  render() {
    console.log('data: ', this.data);
  }
}