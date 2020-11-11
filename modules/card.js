var Card = function (number, content, color, shape) {
    this.number = number;
    this.content = content;
    this.color = color;
    this.shape = shape;

    this.name = this.number + this.content + this.color + this.shape;
    this.imageUrl = this.name + '.svg';
    this.isSelected = false;
    this.isActive = false;
};