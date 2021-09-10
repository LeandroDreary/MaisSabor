import sharp from 'sharp';
import imgbbUploader from 'imgbb-uploader';

export async function uploadFile(file) {
    let base64string = (await sharp(file?.path).webp().toBuffer()).toString('base64')
    const options = { apiKey: process.env.IMGBB_APIKEY, base64string };
    return await imgbbUploader(options).then(response => ({ image: response.url, deleteImageUrl: response.delete_url }))
}