export type RandomUser = {
login: { uuid: string }
name: { title: string; first: string; last: string }
gender: string
picture: { thumbnail: string; medium: string; large: string }
email: string
location: {
city: string
state: string
country: string
coordinates: { latitude: string; longitude: string }
}
}


export type WeatherSummary = {
icon: string
current: number
min: number
max: number
}