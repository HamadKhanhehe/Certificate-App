    import React, { useEffect, useState } from 'react';
    import {Html5QrcodeScanner} from 'html5-qrcode';

    const AddStudent = () => {
    const [scanResult, setScanResult] = useState(null)


    useEffect(() => {
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
        });
        
        scanner.render(success, error);
        
        function success(result) {
            scanner.clear();
            setScanResult(result);
        }
        
        function error(err) {
            console.warn(err);
        }
    }, [])
        return (
            <>
            <div className='bg-slate-400 w-auto h-[800px] '>
            <div className='w-80 h-32 mx-auto   '>
    <h3>Scan your card to mark your attendance</h3>
    {
        scanResult ? <div> success: <a href={"http://" + scanResult}>{scanResult}</a> </div>
        : <div id='reader'></div>
        }

            </div>
            </div>
            </>
        )
    }

    export default AddStudent;





  