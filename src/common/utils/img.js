import cookie from 'react-cookies';

export const initProperties = {
    listType: "picture-card",
    action: serverUrl + "/upload",
    headers: {
        'Authorization': cookie.load('token')
    },
    accept: "image/png, image/jpg, image/jpeg, image/gif, image/bmp",
    formatter: (res) => {
        return {
            code: (res && res.url) ? '0' : '1',
            imgURL: res.url
        };
    }
}

export const initValid = (req) => {
    return Object.assign({}, {
        valueName: "fileList",
        getValueFromEvent: info => {
            if (info.fileList && info.fileList.length) {
                return info.fileList;
            }
            return [];
        }
    }, req)
}

export const imgsToArray = (imgs) => {
    if (!(imgs && imgs.length > 0)) {
        return [];
    }
    return imgs.split(",").map(item => {
        return {
            "imgURL": item
        }
    });
}


export const fileListToImgs = (fileList) => {
    if (!(fileList && fileList.length > 0)) {
        return null;
    }
    return fileList.map(item => item.imgURL).join();
}