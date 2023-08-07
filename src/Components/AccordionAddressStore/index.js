import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTranslation } from 'react-i18next';

export default function AccordionStore() {
  const { t } = useTranslation();
  return (
    <div>
      <Accordion sx={{backgroundColor: '#f8f7f4'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography sx={{ fontWeight: 'bold' }} >HANOI STORES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ArrowForwardIosIcon fontSize='small' color='primary'/>{t('address-1')}  <br />
            <ArrowForwardIosIcon fontSize='small' color='primary'/> {t('address-2')} <br />
            <ArrowForwardIosIcon fontSize='small' color='primary'/> {t('address-3')}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{backgroundColor: '#f8f7f4'}}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ fontWeight: 'bold' }}>TP.HCM STORES</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ArrowForwardIosIcon fontSize='small' color='primary'/> {t('address-4')} <br />
            <ArrowForwardIosIcon fontSize='small' color='primary'/> {t('address-5')}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
