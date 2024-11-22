import {
  GridContainer,
  Icon,
  Identifier,
  IdentifierGov,
  IdentifierIdentity,
  IdentifierLink,
  IdentifierLinkItem,
  IdentifierLinks,
  IdentifierLogo,
  IdentifierLogos,
  IdentifierMasthead,
  Link,
} from '@trussworks/react-uswds'
import { Trans, useTranslation } from 'react-i18next'

export const CustomFooter = () => {
  const { t } = useTranslation('components', { keyPrefix: 'footer' })
  const { t: tPages } = useTranslation('pages', { keyPrefix: 'global' })
  return (
    <footer role="contentinfo">
      <GridContainer className="usa-footer__return-to-top">
        <Link href="#">{t('returnTop')}</Link>
      </GridContainer>
      <Identifier>
        <IdentifierMasthead aria-label={t('identifierAria')}>
          <IdentifierLogos>
            <IdentifierLogo href="/">
              {/* TO_DO_YOUR_LOGO_HERE */}
              <Icon.Home className="text-white" size={5} />
            </IdentifierLogo>
          </IdentifierLogos>
          <IdentifierIdentity domain={tPages('domain')}>
            <Trans
              t={t}
              i18nKey="official"
              components={[
                <Link key="official" href="/">
                  {tPages('stateOrTerritory')}
                </Link>,
              ]}
            />
          </IdentifierIdentity>
        </IdentifierMasthead>
        <IdentifierLinks navProps={{ 'aria-label': t('links') }}>
          <IdentifierLinkItem key="link1">
            <IdentifierLink href="/">{t('link1')}</IdentifierLink>
          </IdentifierLinkItem>
          <IdentifierLinkItem key="link2">
            <IdentifierLink href="/">{t('link2')}</IdentifierLink>
          </IdentifierLinkItem>
          <IdentifierLinkItem key="link3">
            <IdentifierLink href="/">{t('link3')}</IdentifierLink>
          </IdentifierLinkItem>
          <IdentifierLinkItem key="home">
            <IdentifierLink href="/">{t('home')}</IdentifierLink>
          </IdentifierLinkItem>
        </IdentifierLinks>
        <IdentifierGov aria-label={t('govAria')}>
          {t('copyright')}
        </IdentifierGov>
      </Identifier>
    </footer>
  )
}
