export function getIdUrl(url:string): string {
    return url.substring(url.lastIndexOf('/') + 1)
}