import React, { useState, useEffect, useRef } from "react";
import {
    BrowserMultiFormatOneDReader,
    // BrowserMultiFormatReader,
    IScannerControls
} from "@zxing/browser";

const getQRCodeReaderControls = async (selectedDeviceId: string) => {
    const codeReader = new BrowserMultiFormatOneDReader();
  
    const previewElem = document.querySelector("video");
    const videoElem = previewElem as HTMLVideoElement;
  
    // you can use the controls to stop() the scan or switchTorch() if available
  
    // decodeOnceFromVideoDevice
    const controls = await codeReader.decodeFromVideoDevice(
      selectedDeviceId,
      videoElem,
      (result, error, controls) => {
        // use the result and error values to choose your actions
        // you can also use controls API in this scope like the controls
        // returned from the method.
        console.log("---- result: ", result);
        console.log("---- error: ", error);
        console.log("---- controls: ", controls);
  
        if (result) {
          alert(JSON.stringify(result));
        }
      }
    );
  
    return controls;
  };
  
  type Device = {
    deviceId: string;
    label: string;
  };
  
  const ScanBarcode: React.FC = () => {
    const controlsRef = useRef<IScannerControls | null>(null);
    const [selectedDeviceId, setSelectedDeviceId] = useState("");
    const [devices, setDevices] = useState<Array<Device>>([]);

  
    useEffect(() => {
      const getDevices = async () => {
        // mobile device can't be enumerated, method not support
        const videoInputDevices = await BrowserMultiFormatOneDReader.listVideoInputDevices();
  
        // choose your media device (webcam, frontal camera, back camera, etc.)
        const selectedDeviceId = videoInputDevices[0].deviceId;
  
        console.log(`Started decode from camera with id ${selectedDeviceId}`);
  
        setDevices(videoInputDevices);
        setSelectedDeviceId(selectedDeviceId);
      };
  
      getDevices();
    }, []);
  
    return (
      <div>
        <div id="sourceSelectPanel">
          <label htmlFor="sourceSelect">Select the camera:</label>
          <select
            id="sourceSelect"
            value={selectedDeviceId}
            onChange={(event) => setSelectedDeviceId(event.target.value)}
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
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={async () => {
            controlsRef.current = await getQRCodeReaderControls(selectedDeviceId);
          }}
        >
          Start
        </button>{" "}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            controlsRef.current?.stop();
          }}
        >
          Stop
        </button>
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
                      <h3 className="text-3xl font-semibold">
                        Scanner
                    </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowModal(false)}
                      >
                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                          ×
                      </span>
                      </button>
                    </div>
                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <div>
                        <video
                          id="video"
                          width="600"
                          height="400"
                          style={{ border: "1px solid gray" }}
                        ></video>
                        <ScanBarcode />
                      </div>
                    </div>
                    {/*footer*/}
                    <div className="flex items-center justify-end p-6 border-t border-solid border-gray-300 rounded-b">
                      <button
                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowModal(false)}
                      >
                        Close
                    </button>
                      <button
                        className="bg-blue-500 text-white active:bg-green-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setShowModal(false)}
                      >
                        Send Barcode Number
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