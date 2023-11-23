export class FetchError {
    private readonly _status
    private readonly _message
    get message() {
        return this._message
    }

    get status() {
        return this._status
    }

    constructor(status: number, message: string) {
        this._status = status
        this._message = message
    }
}