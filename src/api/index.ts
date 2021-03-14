export interface Thumbnail {
   url: string,
   alternativeText: string,
   width: number,
   height: number,
}

export type FormatKey = "thumbnail" | "extra-small" | "large" | "medium" | "small" | "extra-large"
export type ImgFormatType = {
   [_ in FormatKey]: Thumbnail;
};