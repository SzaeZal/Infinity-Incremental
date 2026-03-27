const Load = () => {
    let json=DecodePartialJwt()
    return json
}

const DecodePartialJwt = () => {
    let jwt = localStorage.getItem('InfinityIncSave')
    if (jwt != null || jwt != '') {
        return atob(jwt)
    }
    return null
}

export default Load
