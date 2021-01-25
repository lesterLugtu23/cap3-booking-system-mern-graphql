const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
})

const nodeServer = () => {
	return 'http://localhost:4000/'
}

export {
	toBase64,
	nodeServer
}