function validarSession() {
    const session = JSON.parse(window.sessionStorage.getItem("session"))

    if (!session) {
        window.location.href = "/login"
        return
    }

    return session.id
}