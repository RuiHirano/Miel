import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Organization, OrganizationService } from '../core/database';
import { useDatabase } from './useDatabase';
import { mockOrganizations } from '../domains/organization/mock';
import { useDemoMode } from '../contexts/DemoModeContext';

export function useOrganization() {
  const { organizationSlug } = useParams<{ organizationSlug: string }>();
  const navigate = useNavigate();
  const { isReady, isDemo } = useDatabase();
  const { isDemo: isDemoMode } = useDemoMode();
  const [currentOrganization, setCurrentOrganization] = useState<Organization | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrganization = async () => {
      if (!organizationSlug) {
        // If no slug provided, redirect to default organization
        if (isDemoMode) {
          // In demo mode, use first mock organization
          const defaultOrg = mockOrganizations[0];
          navigate(`/${defaultOrg.slug}/dashboard`, { replace: true });
        } else if (isReady) {
          // In real mode, get user's first organization
          try {
            const orgService = new OrganizationService();
            const orgs = await orgService.getAllOrganizations();
            if (orgs.length > 0) {
              navigate(`/${orgs[0].slug}/dashboard`, { replace: true });
            } else {
              // No organizations, redirect to create one
              setError('No organization found');
              setLoading(false);
            }
          } catch (err) {
            setError('Failed to load organizations');
            setLoading(false);
          }
        }
        return;
      }

      try {
        setLoading(true);
        
        if (isDemoMode) {
          // In demo mode, find from mock data
          const org = mockOrganizations.find(o => o.slug === organizationSlug);
          if (org) {
            setCurrentOrganization(org);
          } else {
            setError('Organization not found');
          }
        } else if (isReady) {
          // In real mode, query from database
          const orgService = new OrganizationService();
          const org = await orgService.getOrganizationBySlug(organizationSlug);
          if (org) {
            setCurrentOrganization(org);
          } else {
            setError('Organization not found');
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load organization');
      } finally {
        setLoading(false);
      }
    };

    loadOrganization();
  }, [organizationSlug, isReady, isDemoMode, navigate]);

  const switchOrganization = (newSlug: string) => {
    navigate(`/${newSlug}/dashboard`);
  };

  return {
    currentOrganization,
    loading,
    error,
    switchOrganization,
    organizationSlug,
  };
}