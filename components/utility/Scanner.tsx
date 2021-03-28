import React, { useState, useEffect, useRef } from "react";
import { BrowserMultiFormatOneDReader, IScannerControls } from "@zxing/browser";

type Device = {
	deviceId: string;
	label: string;
};

const ScanBarcode: React.FC = () => {
	const controlsRef = useRef<IScannerControls | null>(null);
	const [selectedDeviceId, setSelectedDeviceId] = useState("");
	const [devices, setDevices] = useState<Array<Device>>([]);
	const [name, setName] = useState("");
	const [brand, setBrand] = useState("");

	const getQRCodeReaderControls = async (selectedDeviceId: string) => {

		try {
			const codeReader = new BrowserMultiFormatOneDReader();
			const previewElem = document.querySelector("video");
			const videoElem = previewElem as HTMLVideoElement;

			const BASE_URL =
				"https://gb-be.de/";

			const controls =
				await codeReader.decodeFromVideoDevice(
					selectedDeviceId,
					videoElem,
					(result, error, controls) => {
						console.log("---- result: ", result);

						if (result) {
							// @ts-ignore
							const scanResult = JSON.parse(result);
							alert("Barcode number: " + scanResult);

							fetch(BASE_URL + "product/" + scanResult)
								.then((response) => response.json())
								.then((data) => {
									// product props: name, brand, barcode, corporation, state
									alert(BASE_URL + "product/" + scanResult)
									const productName = data.product[0].name;
									setName(productName);
									const productBrand = data.product[0].brand;
									setBrand(productBrand);
								})
								.catch((error) => {
									alert("failed to fetch the info")
									console.log(error);
								});
						}
					}
				)


			// setTimeout(() => controls.stop(), 30000);
			return controls;
		}
		catch (error) { console.log }
	};

	useEffect(() => {
		const getDevices = async () => {
			try {
				const videoInputDevices = await BrowserMultiFormatOneDReader.listVideoInputDevices();
				const selectedDeviceId = videoInputDevices[0].deviceId;

				console.log(`Started decode from camera with id ${selectedDeviceId}`);

				setDevices(videoInputDevices);
				setSelectedDeviceId(selectedDeviceId);
			}
			catch (error) { console.log("Error: need self signed TLS Certs for reading camera list") };
		}
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
							controlsRef.current = await getQRCodeReaderControls(
								selectedDeviceId
							)
						}
						catch (err) { console.log("Error: cannot read the list of camera") }
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
				Name: {name}<br />
				Brand: {brand}
			</div>
		</div>
	);
};

const ScannerPage: React.FC = () => {
	const [showModal, setShowModal] = React.useState(false);
	return (
		<>
			<a
				type="button"
				style={{ transition: "all .15s ease", cursor: "pointer" }}
				onClick={() => setShowModal(true)}
				data-testid="scanner-title"
			>
				Scanner
      </a>
			{showModal ? (
				<>
					<div
						className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
					// onClick={() => setShowModal(false)}
					>
						<div className="relative w-auto my-6 mx-auto max-w-3xl">
							{/*content*/}
							<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
								{/*header*/}
								<div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t">
									<h3
										className="text-3xl font-semibold"
										data-testid="scanner-title"
									>
										Barcode
                  </h3>
									<button
										className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
										onClick={() => setShowModal(false)}
									></button>
								</div>
								{/*body*/}
								<div className="relative p-6 flex-auto">
									<div>
										<video
											id="video"
											width="600"
											height="400"
											style={{ border: "1px solid gray" }}
											data-testid="video-elm"
										></video>
										<ScanBarcode />
									</div>
								</div>
								{/*footer*/}
								<div className="flex items-center space-x-3 justify-end p-6 border-t border-solid border-gray-300 rounded-b">
									<button
										className="colorful-button"
										type="button"
										style={{
											transition: "all .15s ease",
											backgroundColor: "#EF4444",
											borderColor: "#EF4444",
										}}
										onClick={() => setShowModal(false)}
									>
										Close
                  </button>
									<button
										className="colorful-button"
										type="button"
										style={{ transition: "all .15s ease" }}
										onClick={() => setShowModal(false)}
									>
										Send
                  </button>
								</div>
							</div>
						</div>
					</div>
					<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
				</>
			) : null}
		</>
	);
};

export default ScannerPage;
