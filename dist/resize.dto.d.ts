import 'reflect-metadata';
import { GravityEnum } from 'sharp';
import { format } from './interfaces';
export declare class ResizeDto {
    constructor(args: Partial<ResizeDto>);
    format?: format;
    height?: number;
    width: number;
    quality: number;
    progressive: boolean;
    crop: boolean;
    trim: boolean;
    bypassOnError: boolean;
    gravity?: keyof GravityEnum;
    url?: string;
}
