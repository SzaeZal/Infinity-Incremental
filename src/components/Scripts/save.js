const Save = (playerParsedToJson) => {
    let jwt = CreatePartialJWT(playerParsedToJson)
    localStorage.setItem('InfinityIncSave', jwt)
}

const CreatePartialJWT = (payloadInJson) => {
    let payloadInBase64 = btoa(payloadInJson)
    let jwt = payloadInBase64
    return jwt
}

export default Save
