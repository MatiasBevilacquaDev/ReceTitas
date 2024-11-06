function validarSession() {
    const session = JSON.parse(window.sessionStorage.getItem("session"))

    if (!session) {
        window.location.href = "/login"
        return
    }

    return session.id
}

function validarAdmin() {
    const session = JSON.parse(window.sessionStorage.getItem("session"))
    const id = session.id
    if ( id == 8) {
    }
    else{
    window.location.href = "/login.html"
    }
}