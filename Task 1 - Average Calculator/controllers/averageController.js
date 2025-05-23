import axios from "axios"

// This is window previous state
var windowPrevState = []
// This is numbers stored
var numbers = []

const windowSize = 10 // size of window is 10
const averageCounter = {
    calAverage: async (req, res) => {
        try {
            const val = req.params.numberid
            var option = ""
            if (val == "e") option = "even"
            else if (val == "p") option = "primes"
            else if (val == "f") option = "fibo"
            else if (val == "r") option = "rand"
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ3ODk2NDUzLCJpYXQiOjE3NDc4OTYxNTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjhhYmYyNjI2LTgzYjUtNDAyZi1iMmRkLTcxMjVmY2IxZmNiZCIsInN1YiI6IjIyMDAwMzAzOTFjc2VoQGdtYWlsLmNvbSJ9LCJlbWFpbCI6IjIyMDAwMzAzOTFjc2VoQGdtYWlsLmNvbSIsIm5hbWUiOiJrb21taXJpc2V0dHkgc3Jpbml2YXMiLCJyb2xsTm8iOiIyMjAwMDMwMzkxIiwiYWNjZXNzQ29kZSI6ImJlVEpqSiIsImNsaWVudElEIjoiOGFiZjI2MjYtODNiNS00MDJmLWIyZGQtNzEyNWZjYjFmY2JkIiwiY2xpZW50U2VjcmV0IjoiUmRod3BCbUhzRmFnbmdWbSJ9.DVx-7Tz01tweX4fZTMsJccTb0ooasB__0vYY_AmStyU"
            const currWindow = await axios.get(`http://20.244.56.144/evaluation-service/${option}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}` // to send token for authorization
                    }
                }
            )
            console.log(currWindow);

            for (var i of currWindow.data.numbers) {
                numbers.push(i)
            }
            console.log("Average numbers", numbers);

            while (numbers.length > windowSize) {
                numbers.shift()
            }
            let sum = 0
            for (var i of numbers) {
                sum += i
            }
            const average = sum / numbers.length
            
            const response = {
                windowPrevState,
                windowCurrState: currWindow.data.numbers,
                numbers,
                average
            };

            windowPrevState = currWindow.data.numbers;

            res.json(response);
        } catch (error) {
            console.log(error);

        }
    }
}

export default averageCounter;