const COLORS = {
	orange: {
		bg: "bg-[#FFFFFF]",
		badge: "bg-[#FF8C00]",
	},
	white: {
		bg: "bg-[#FFFFFF]]",
		badge: "bg-[#FF8C00]",
	},
	sunglow: {
		bg: "bg-[#FFFFFF]",
		badge: "bg-[#FF8C00]",
	},
};

export const getRandomColor = () => {
	const colorNames = Object.keys(COLORS); 
	const randomIndex = Math.floor(Math.random() * colorNames.length); 
	const randomColorName = colorNames[randomIndex]; 
	return COLORS[randomColorName]; 
};