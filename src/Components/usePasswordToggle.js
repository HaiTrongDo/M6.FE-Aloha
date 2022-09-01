import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(true);
    const Icon = <FontAwesomeIcon icon={visible ? "eye-slash" : "eye"} />;
    const InputType = visible ? "text" : "password";
    return [InputType, Icon];
};
