export default function Counter({ number, name }: { number: number; name: string }) {
	return (
		<div className="text-center p-4">
			<h3 className="text-lg font-bold">{number || 0}</h3>
			<p>{name}</p>
		</div>
	);
}
