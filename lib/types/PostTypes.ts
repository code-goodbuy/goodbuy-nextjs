export interface DBPost {
	title: string;
	EAN: string;
	country: string;
	likes: number;
}

export interface PostType extends DBPost {
	username: string;
	profileImage: string;
}
