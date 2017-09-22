export class Base {
	
	 createdBy:number=1;

	 createdOn:string;
	
	 updatedBy:number=1;

	 updatedOn:string="02/02/2017";

	 active:string="Y";

	public get $createdBy(): number {
		return this.createdBy;
	}

	public set $createdBy(value: number) {
		this.createdBy = value;
	}

	public get $createdOn(): string {
		return this.createdOn;
	}

	public set $createdOn(value: string) {
		this.createdOn = value;
	}

	public get $updatedBy(): number {
		return this.updatedBy;
	}

	public set $updatedBy(value: number) {
		this.updatedBy = value;
	}

	public get $updatedOn(): string {
		return this.updatedOn;
	}

	public set $updatedOn(value: string) {
		this.updatedOn = value;
	}

	public get $active(): string {
		return this.active;
	}

	public set $active(value: string) {
		this.active = value;
	}

}