const postData = async (url, data) => {
    const postResult = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });
    return await postResult.json();
};

const getResources = async (url) => {
    const getResult = await fetch(url);
    if (!getResult.ok) {
        throw new Error(`Could not find ${url}, status: ${getResult.status}`);
    }
    return await getResult.json();
};

export {postData};
export {getResources};