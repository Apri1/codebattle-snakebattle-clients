class Board {
  constructor() {
    this._board = "";
  }

  update(raw) {
    this._board = raw.replace("board=", "");
  }

  _getMappedBoard = () =>
    this._board.split("").map((element, index) => {
      return { type: element, coordinates: this.getPointByShift(index) };
    });

  get size() {
    return Math.sqrt(this._board.length);
  }

  toString() {
    const lineRegExp = new RegExp(`(.{${this.size}})`, "g");
    return this._board.replace(lineRegExp, "$1\n");
  }

  findAllElements = (...elementTypes) => {
    return this._getMappedBoard().reduce((points, element, index) => {
      if (elementTypes.includes(element.type)) {
        points.push(element.coordinates);
      }

      return points;
    }, []);
  };

  findElement = elementType => {
    const foundPoints = this._getMappedBoard()
      .filter(element => element.type === elementType)
      .map(element => element.coordinates);

    return foundPoints[0];
  };

  findFirstElement = (...elementTypes) => {
    const element = this._getMappedBoard().find((element) => {
      return elementTypes.includes(element.type)
    })

    if (!element) {
      return null
    }

    return element.coordinates
  };

  getPointByShift = shift =>
    new Point(shift % this.size, Math.floor(shift / this.size));

  getWalls = () => this.findAllElements(ELEMENTS.WALL);
  getStones = () => this.findAllElements(ELEMENTS.STONE);
  getApples = () => this.findAllElements(ELEMENTS.APPLE);
  getGold = () => this.findAllElements(ELEMENTS.FURY_PILL);
  getFuryPills = () => this.findAllElements(ELEMENTS.FURY_PILL);
  getStartPoints = () => this.findAllElements(ELEMENTS.START_FLOOR);
  getFlyingPills = () => this.findAllElements(ELEMENTS.FLYING_PILL);
  getBarriers = () => {
    const elementTypes = [
      "WALL",
      "START_FLOOR",
      "ENEMY_HEAD_SLEEP",
      "ENEMY_TAIL_INACTIVE",
      "TAIL_INACTIVE",
      "STONE"
    ].map(elementName => ELEMENTS[elementName]);

    return this.findAllElements(...elementTypes);
  };

  isBarrierAt = point => {
    return !!this.getBarriers().find(barrierPoint =>
      barrierPoint.equals(point)
    );
  };
}
