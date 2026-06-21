import { Outlet } from "react-router-dom";

export function AuthLayout() {
    return (
        <div className="bg-gray-50 w-full h-full grid content-center justify-center px-4 py-10">
            <div className="max-w-100 bg-white rounded-sm shadow-card p-12">
                <div className="flex justify-center">
                  <div className="flex flex-col items-center w-25">
                    <div className="flex justify-center w-25 bg-primary">
                    <div className="text-white text-3xl leading-7 font-normal text-center h-18.5 w-min flex items-end pb-2">TO DO</div>
                    </div>
                    <div className="w-full h-6.5 custom-clip bg-primary"></div>
                  </div>
                </div>
                <Outlet />
            </div>
        </div>
    )

}