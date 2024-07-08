import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import styled from 'styled-components';

const CopyBlock = styled.div`
  cursor: pointer;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  display: inline-block;
`;

const CopyValue = () => {
    const [copied, setCopied] = useState(false);
    const valueToCopy = "arinavasch@gmail.com";

    return (
        <CopyToClipboard text={valueToCopy} onCopy={() => setCopied(true)}>
            <CopyBlock>
                {valueToCopy}
                {copied && <span> (Copied!)</span>}
            </CopyBlock>
        </CopyToClipboard>
    );
};

export default CopyValue;
