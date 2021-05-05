import React from "react";

export interface DBPost {
	title: string;
	EAN: string;
	country: string;
	likes: number;
}

export interface PostType extends DBPost {
	username: string;
	imageURL: string;
}

export interface PictureType {
	source: string;
	alt: string;
	isLarge: boolean;
	author: string;
	authorLink: string;
	rotation?: "left" | "right";
}
