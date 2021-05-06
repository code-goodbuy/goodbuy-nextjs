import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatOneDReader, IScannerControls } from "@zxing/browser";
import DeviceType from "../../lib/types/DeviceTypes";

const ScanBarcode: React.FC = () => {
	const controlsRef = useRef<IScannerControls | null>(null);
	const [selectedDeviceId, setSelectedDeviceId] = useState("");
	const [devices, setDevices] = useState<Array<DeviceType>>([]);
	const [productInfo, setProductInfo] = useState({ name: "", brand: "", corporation: "", ean: "" });

	const getQRCodeReaderControls = async (selectedDeviceId: string) => {
		try {
			const codeReader = new BrowserMultiFormatOneDReader();
			const previewElem = document.querySelector("video");
			const videoElem = previewElem as HTMLVideoElement;

			const controls = await codeReader.decodeFromVideoDevice(
				selectedDeviceId,
				videoElem,
				(result, error, controls) => {
					if (result) {
						// @ts-ignore
						const scanResult = JSON.parse(result);
						fetch("https://gb-be.de/api/product/" + scanResult)
							.then((response) => response.json())
							.then((data) => {
								const productName = data.product[0].name;
								const productBrand = data.product[0].brand;
								const productCorp = data.product[0].corporation;
								const productEan = data.product[0].ean;
								setProductInfo({
									name: productName,
									brand: productBrand,
									corporation: productCorp,
									ean: productEan
								});
							})
							.catch((_) => {
								console.error("Error: failed to fetch the info from database");
							});
					}
				}
			);
			return controls;
		} catch (error) {
			console.log("Error: failed to initiate scan");
		}
	};

	useEffect(() => {
		const getDevices = async () => {
			try {
				const videoInputDevices = await BrowserMultiFormatOneDReader.listVideoInputDevices();
				const selectedDeviceId = videoInputDevices[0].deviceId;

				console.log(`Started decode from camera with id ${selectedDeviceId}`);

				setDevices(videoInputDevices);
				setSelectedDeviceId(selectedDeviceId);
			} catch (error) {
				console.log("Error: need self signed TLS Certs for reading camera list");
			}
		};
		getDevices();
	}, []);

	return (
		<div>
			<div id="sourceSelectPanel">
				<br />
				<label htmlFor="sourceSelect">Select the camera:</label>
				<select
					id="sourceSelect"
					value={selectedDeviceId}
					onChange={(event) => setSelectedDeviceId(event.target.value)}
					data-testid="camera-select"
				>
					{devices.map(({ deviceId, label }) => (
						<option key={deviceId} value={deviceId}>
							{label}
						</option>
					))}
				</select>
				<br></br>
				(if you change the selected camera, please click again the Start button)
			</div>
			<br />
			<div className="space-x-3">
				<button
					className="colorful-button"
					onClick={async () => {
						try {
							// @ts-ignore
							controlsRef.current = await getQRCodeReaderControls(selectedDeviceId);
						} catch (err) {
							console.log("Error: cannot read the list of camera");
						}
					}}
				>
					Start
				</button>{" "}
				<button
					className="colorful-button"
					onClick={() => {
						controlsRef.current?.stop();
					}}
				>
					Stop
				</button>
			</div>
			<br />
			<div className="space-x-3">
				Barcode: {productInfo.ean}
				<br />
				Name: {productInfo.name}
				<br />
				Brand: {productInfo.brand}
				<br />
				Corporation: {productInfo.corporation}
				<br />

			</div>
		</div>
	);
};

export default ScanBarcode;
