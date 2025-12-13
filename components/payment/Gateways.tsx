/* eslint-disable  @typescript-eslint/no-explicit-any */

import Image from "next/image";
import CheckIcon from "../icons/CheckIcon";
import Skeleton from "../shared/Skeleton";
import { GatewayGroupItem } from "@/types/payment";

type Props = {
  getGatewaysLoading: boolean;
  gateways?: GatewayGroupItem[];
  selectedGatewayId?: number;
  onSelectGateway: (id: number) => void;
};

const Gateways: React.FC<Props> = (props) => {

  const { getGatewaysLoading, gateways , selectedGatewayId, onSelectGateway} = props;

  if (getGatewaysLoading) {
    return [1, 2].map((i) => (
      <div key={i} className="mb-10">
        <div className="flex justify-between mb-4">
          <Skeleton className="w-12 h-4" dark />
          <Skeleton className="w-24 h-4" dark />
        </div>

        <div
          className="flex rounded-[13px] items-center justify-between p-5 bg-white dark:bg-[#192a39] mb-4"
        >
          <div className="flex items-center gap-3">
            <Skeleton type="image" className="w-7 h-7 rounded-full" dark />
            <Skeleton className="w-24 h-4" dark />
          </div>
          <Skeleton type="image" className="w-7 h-7" dark />
        </div>
      </div>
    ));
  }

  return gateways?.map((item) => (
    <div key={item.keyword} className="mb-4" >
      <div
        className="flex flex-wrap gap-2 items-center justify-between mb-2"
      >
        <h5>
          {item.title} <span className="text-xs"> ({item.name}) </span>
        </h5>

        <div className="flex gap-1 items-center">
          <Image
            src={item.image?.path || "/images/default-game.png"}
            alt={item.image?.altAttribute || item.name || ""}
            title={item.image?.titleAttribute || item.name}
            className="w-6 h-6 object-contain object-center block"
            width={24}
            height={24}
          />
          <span className="text-[11px]">{item.description}</span>
        </div>
      </div>

      {item.gateways.map((gatewayItem) => (
        <button
          key={gatewayItem.id}
          type="button"
          className={`font-semibold w-full p-[2px] rounded-[15px] mt-3 ${
            selectedGatewayId === gatewayItem.id
              ? "bg-gradient-to-t from-[#01b59c] to-[#9afeab] text-white"
              : "bg-white border border-[#cccccc] dark:bg-[#192a39] dark:border-[#192a39]"
          }`}
          onClick={() => {
            onSelectGateway(gatewayItem.id);
          }}
        >
          <div
            className={`flex rounded-[13px] items-center justify-between p-5 ${
              selectedGatewayId === gatewayItem.id
                ? "bg-gradient-to-t from-[#e6fcf5] to-[#ebfbee] text-[#04b69c] dark:from-[#012431] dark:to-[#0f2b32] dark:text-white"
                : ""
            }`}
          >
            <div className="flex gap-3 items-center">
              <div
                className={`w-7 h-7 rounded-full border inline-flex justify-center items-center ${
                  selectedGatewayId === gatewayItem.id
                    ? "bg-gradient-to-t from-[#01b59c] to-[#9afeab] border-[#01b59c]"
                    : "border-[#cccccc] dark:border-white"
                }`}
              >
                {selectedGatewayId === gatewayItem.id && (
                  <CheckIcon className="w-5 h-5 fill-white" />
                )}
              </div>
              {gatewayItem.displayName || gatewayItem.name}
            </div>

            <Image
              src={gatewayItem.image?.path || "/images/default-game.png"}
              alt={gatewayItem.image?.altAttribute || item.name || ""}
              title={gatewayItem.image?.titleAttribute || item.name}
              className="w-7 h-7 object-contain object-center block"
              width={24}
              height={24}
            />
          </div>
        </button>
      ))}
    </div>
  ));
};

export default Gateways;
