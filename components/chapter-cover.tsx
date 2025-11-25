import {WebinyLogo} from "@/components/webiny-logo";

interface IChapterCover {
    title?: string;
    chapterTitle?: string;
    chapterNumber?: number;
}

export function ChapterCover({ title = "Learn Webiny", chapterTitle = "Getting started", chapterNumber = 1 }: IChapterCover) {
    return(
        <div className={"relative -mt-18 flex w-full justify-center"}>
            <div className="relative">
                <div className="mx-auto mb-4 rounded-2xl flex items-center justify-center mb-8">
                    <div
                        className="relative flex h-[280px] w-[250px] rounded-l-md rounded-r-sm outline-solid -outline-offset-1 outline-black/5 bg-white">
                        <div
                            className="h-full w-5 rounded-l-md bg-linear-to-r from-[#2e2e2e] via-[#3e3e3e] to-[#2e2e2e]"></div>
                        <div
                            className="dark:to-gray-1000 flex h-full w-full rounded-r-sm bg-linear-to-br from-gray-50 to-accent/5 pb-3 pr-3 dark:from-gray-50">
                            <div className="absolute -top-px right-6 w-4 text-accent">
                                <svg fill="none" height="100%" viewBox="122 0 16 24" width="100%"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M122 1C122 0.447716 122.448 0 123 0H137C137.552 0 138 0.447715 138 1V22.259C138 23.0308 137.163 23.5116 136.496 23.1227L130.504 19.6273C130.193 19.4456 129.807 19.4456 129.496 19.6273L123.504 23.1227C122.837 23.5116 122 23.0308 122 22.259V1Z"
                                        fill="currentColor"></path>
                                </svg>
                            </div>
                            <div className="absolute bottom-[25px] right-5 max-w-[100px]">
                                <WebinyLogo />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute left-[45px] top-[80px] max-w-[200px]">
                    <p
                        className="text-left text-[22px] font-semibold leading-[20px]"
                        style={{"color": "rgb(0, 0, 0)"}}>
                        {title}
                    </p>
                    <div className="animate-fadeIn">
                        <p
                            className="text-left text-[18px] leading-[20px] font-semibold leading-[20px]"
                            style={{"fontSize": "14px", "color": "rgb(102, 102, 102)", "paddingTop": "8px"}}>
                            Chapter {chapterNumber}:
                        </p>
                        <p
                            className="text-left"
                            style={{"fontSize": "14px", "color": "rgb(102, 102, 102)", "lineHeight": "1.15"}}>
                            {chapterTitle}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export function ChapterCoverIcon({icon} : {icon?: React.ReactNode}) {
    return(
        <div className={"relative mt-2 flex w-full justify-center"}>
            <div className="relative">
                <div className="mx-auto mb-4 rounded-2xl flex items-center justify-center mb-8">
                    <div
                        className="relative flex h-[80px] w-[70px] rounded-l-md rounded-r-sm outline-solid -outline-offset-1 outline-black/5 bg-white">
                        <div
                            className="h-full w-3 rounded-l-md bg-linear-to-r from-[#2e2e2e] via-[#3e3e3e] to-[#2e2e2e]"></div>
                        <div
                            className="flex h-full w-full rounded-r-sm bg-linear-to-br from-gray-50 to-black/10 pb-3 pr-3 dark:from-gray dark:to-black/50">
                            <div className="absolute bottom-[22px] left-[25px] max-w-[100px h-[32px]">
                                {icon}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}