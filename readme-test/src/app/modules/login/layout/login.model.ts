export class Login {
    userName:string;

    password:string;

    public get $loginName(): string {
        return this.userName
    }

    public set $loginName(value: string) {
        this.userName = value;
    }

    public get $password(): string {
        return this.password;
    }

    public set $password(value: string) {
        this.password = value;
    }
}
