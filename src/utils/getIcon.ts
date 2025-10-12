import { weatherIcons } from '@/constants/weatherIcons';

export const getWeatherIconKey = (
  conditionText: string
): keyof typeof weatherIcons => {
  const lowerCaseText = conditionText.toLowerCase();
  if (lowerCaseText.includes('sunny')) return 'sunny';
  if (lowerCaseText.includes('cloudy') || lowerCaseText.includes('overcast'))
    return 'overcast';
  if (lowerCaseText.includes('partly cloudy')) return 'partlyCloudy';
  if (lowerCaseText.includes('rain') || lowerCaseText.includes('drizzle'))
    return 'drizzle';
  if (lowerCaseText.includes('snow')) return 'snow';
  if (lowerCaseText.includes('fog')) return 'fog';
  return 'sunny'; // Default icon if no match
};
