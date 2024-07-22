interface IDayAndNight {
	startDate?: string | Date;
	endDate?: string | Date;
}

export const dayAndNight = ({ startDate, endDate }: IDayAndNight): string | null => {
	if (!startDate || !endDate) {
		return null;
	}

	const inicio = new Date(startDate);
	const final = new Date(endDate);

	// Establecemos la hora a medianoche (00:00:00) para ambos días
	inicio.setHours(0, 0, 0, 0);
	final.setHours(0, 0, 0, 0);

	// Calculamos la diferencia en días sin tomar en cuenta las horas
	const unDiaEnMilisegundos = 1000 * 60 * 60 * 24;
	const diferenciaEnMilisegundos = final.getTime() - inicio.getTime();
	const dias = Math.floor(diferenciaEnMilisegundos / unDiaEnMilisegundos) + 1;

	// Calculamos las noches
	const noches = dias - 1;

	// Construimos el resultado deseado
	const resultadoDias = `${dias} ${dias > 1 ? "Días" : "Día"}`;
	const resultadoNoches = `${noches} ${noches === 1 ? "Noche" : "Noches"}`;

	// Unimos los resultados
	return `${resultadoDias} - ${resultadoNoches}`;
};

