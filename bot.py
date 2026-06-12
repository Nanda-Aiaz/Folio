import requests


def get_weather():
    try:
        response = requests.get(
            "https://wttr.in/?format=j1",
            timeout=10
        )

        data = response.json()

        return data["current_condition"][0]["temp_C"]

    except Exception:
        return "Weather unavailable"


def get_quote():
    try:
        response = requests.get(
            "https://zenquotes.io/api/random",
            timeout=10
        )

        data = response.json()

        return data[0]["q"]

    except Exception:
        return "Quote unavailable"


def build_summary(weather, quote):
    return f"""
Daily Pulse

Temperature: {weather}°C

Quote:
{quote}
"""


def run():
    weather = get_weather()
    quote = get_quote()

    summary = build_summary(weather, quote)

    with open("pulse.txt", "w", encoding="utf-8") as file:
        file.write(summary)

    print("Pulse created successfully!")


if __name__ == "__main__":
    run()
    