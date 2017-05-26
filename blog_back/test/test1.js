/**
 * Created by gd on 2017/5/26/026.
 */


export default async function aaa() {
    let a = await new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(1)
        }, 1000)
    });

    console.log(a);
}