export default class Ray {
  angle: number;
  dx: number;
  dy: number;

  constructor(angle: number, radius: number) {
    this.angle = angle;
    this.dx = radius * Math.cos(angle);
    this.dy = radius * Math.sin(angle);
  }
}
