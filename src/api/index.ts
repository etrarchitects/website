export interface Thumbnail {
   url: string,
   width: number,
   height: number,
   size: number
}

export type FormatKey = "thumbnail" | "large" | "medium" | "small" | "extra-large"
export type ImgFormatType = {
   [_ in FormatKey]: Thumbnail;
};