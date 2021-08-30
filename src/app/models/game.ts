class Game {
    white_elo : number;
    black_elo: number;
    game_url: string;
    pgn: string;
    constructor(white_elo = 0, black_elo = 0, game_url = "", pgn = "") {
        this.white_elo = white_elo;
        this.black_elo = black_elo;
        this.game_url = game_url;
        this.pgn = pgn;

    }
}
export default Game;