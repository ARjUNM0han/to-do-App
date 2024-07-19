import axios from "axios";

const commonApi = async (reqMethod, reqUrl, reqBody) => {
    const reqConfig = {
        url: reqUrl,
        header: { 'Content-Type': 'application/json' },
        method: reqMethod,
        data: reqBody
    }

    return await axios(reqConfig).then((res) => {
        return res
    }).catch((res) => {
        return res
    })
}

export default commonApi