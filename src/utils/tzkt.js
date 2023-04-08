// TODO 8 - Fetch storage of the Lottery by completing fetchStorage

import axios from "axios";

export const fetchStorage = async () => {
    const res = await axios.get(
        "https://api.ghostnet.tzkt.io/v1/contracts/KT1AoZSGkYUaVDhNc4njfdVy6L7FbfSpyLWz/storage/"
    );
    // console.log(res);
    return res.data;

};
