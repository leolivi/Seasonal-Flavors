class Season {
  private season: string;

  constructor() {
    this.season = this.getSeason();
  }

  private getMonth(): number {
    return new Date().getMonth() + 1;
  }

  public getSeason(): string {
    const month = this.getMonth();
    if (month >= 3 && month <= 5) {
      return "spring";
    } else if (month >= 6 && month <= 8) {
      return "summer";
    } else if (month >= 9 && month <= 11) {
      return "autumn";
    } else {
      return "winter";
    }
  }

  getColor() {
    switch (this.season) {
      case "spring":
        return "sfgreen";
      case "summer":
        return "sforange";
      case "autumn":
        return "sfred";
      case "winter":
        return "sfblue";
      default:
        return "sfgreen";
    }
  }
}

export { Season };
